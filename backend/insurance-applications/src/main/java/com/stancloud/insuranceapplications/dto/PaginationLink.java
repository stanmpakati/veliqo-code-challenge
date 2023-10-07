package com.stancloud.insuranceapplications.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PaginationLink {
  private long totalPages;
  private long totalObjects;
  private long currentPage;
  private long pageSize;
}
