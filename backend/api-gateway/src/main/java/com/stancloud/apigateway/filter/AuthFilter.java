package com.stancloud.apigateway.filter;

import com.stancloud.apigateway.client.AuthClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.Map;
import java.util.function.Consumer;

//@Component
//public class AuthFilter extends AbstractGatewayFilterFactory<AuthFilter.Config> {
//
//  @Autowired
//  private RouteValidator routeValidator;
//
//  @Autowired
//  private AuthClient authClient;
//
//  public AuthFilter() {
//      super(Config.class);
//  }
//
//  @Override
//  public GatewayFilter apply(Config config) {
//    return (((exchange, chain) -> {
//      if (routeValidator.isSecured.test(exchange.getRequest())) {
//        if (!exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
//          exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);;
//          return exchange.getResponse().setComplete();
//        }
//
//        String authHeader = exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);
//        if (authHeader != null && authHeader.startsWith("Bearer ")) {
//          exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);;
//        }
//
//        String token = authHeader.substring(7);
//
//        // verify token
//        String response = authClient.verifyToken(token);
//        if (response == null || response.isEmpty()) {
//          exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);;
//          return exchange.getResponse().setComplete();
//        }
//      }
//
//      return chain.filter(exchange);
//    }));
//  }
//
//  public static class Config {
//          // Put the configuration properties
//      }
//}


@RefreshScope
@Component
public class AuthFilter implements GatewayFilter {
  @Autowired
  private RouteValidator routeValidator;

  @Autowired
  private AuthClient authClient;

  @Override
  public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
    ServerHttpRequest request = exchange.getRequest();

    if (routeValidator.isSecured.test(request)) {
      if (!request.getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
        return this.onError(exchange, "Authorization header is missing in request", HttpStatus.UNAUTHORIZED);
      }

      String authHeader = request.getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);
      if (authHeader == null && !authHeader.startsWith("Bearer ")) {
        return this.onError(exchange, "Authorization header is invalid", HttpStatus.FORBIDDEN);
      }

      String token = authHeader.substring(7);

      // verify token
      Mono<String> result = authClient.verifyToken(token);
      return result.flatMap(
          tokenResponse -> {
            if (tokenResponse == null || tokenResponse.isEmpty()) {
              return this.onError(exchange, "Authorization header is invalid", HttpStatus.FORBIDDEN);
            }
            return chain.filter(exchange);
          }
      );

    } else {
      return chain.filter(exchange);
    }
  }

    private Mono<Void> onError(ServerWebExchange exchange, String err, HttpStatus httpStatus) {
      ServerHttpResponse response = exchange.getResponse();
      response.setStatusCode(httpStatus);
      response.getHeaders().add("Content-Type", "application/json");
      Map<String, Object> error = new HashMap<>();
      error.put("httpStatus", httpStatus.value());
      error.put("error", err);
      byte[] errorBytes = error.toString().getBytes();
      DataBuffer buffer = response.bufferFactory().wrap(errorBytes);

      return response.writeWith(Mono.just(buffer));
    }
}