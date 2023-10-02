package com.stancloud.insuranceapplications.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ExceptionTemplate {
  private String code;
  private String message;
}
