package com.stancloud.apigateway.client;

import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.service.annotation.GetExchange;
import org.springframework.web.service.annotation.HttpExchange;
import org.springframework.web.service.annotation.PostExchange;
import reactor.core.publisher.Mono;

import java.util.List;

@HttpExchange
public interface AuthClient {
  @PostExchange("/auth/verify")
  @Async
  Mono<String> verifyToken(@RequestBody String token);
}