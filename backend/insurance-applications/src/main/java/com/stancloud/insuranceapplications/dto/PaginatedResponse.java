package com.stancloud.insuranceapplications.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class PaginatedResponse<T> {
  private List<T> data;
  private PaginationLink links;
}
