package com.stancloud.authenticationservice.response;

import com.fasterxml.jackson.databind.exc.InvalidFormatException
import jakarta.servlet.http.HttpServletResponse
import org.slf4j.LoggerFactory
import org.springframework.dao.DataIntegrityViolationException
import org.springframework.http.HttpStatus
import org.springframework.security.access.AccessDeniedException
import org.springframework.validation.FieldError
import org.springframework.validation.ObjectError
import org.springframework.web.bind.MethodArgumentNotValidException
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseStatus
import java.io.IOException
import java.util.*
import java.util.function.Consumer

//@RestControllerAdvice
class ExceptionControllerAdvice {
  var logger = LoggerFactory.getLogger(ExceptionControllerAdvice::class.java)

//  @ExceptionHandler(CustomExceptionTemplate::class)
//  @Throws(IOException::class)
//  fun handleCustomException(res: HttpServletResponse, ex: CustomExceptionTemplate) {
//    res.sendError(ex.getHttpStatus().value(), ex.getMessage())
//  }

  @ExceptionHandler(AccessDeniedException::class)
  @Throws(IOException::class)
  fun handleAccessDeniedException(res: HttpServletResponse) {
    res.sendError(HttpStatus.FORBIDDEN.value(), "Access denied")
  }

  @ExceptionHandler(Exception::class)
  fun handleException(res: HttpServletResponse): CustomException {
    val exceptionTemplate = CustomException(
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
      errorMessage = "IllegalStateException",
      errors = listOf(res.toString(), "IllegalStateException")
    )
    return exceptionTemplate
  }

  @ResponseStatus(HttpStatus.BAD_REQUEST)
  @ExceptionHandler(MethodArgumentNotValidException::class)
  fun handleValidationExceptions(ex: MethodArgumentNotValidException): Map<String, Any> {
    val res: MutableMap<String, Any> = HashMap()
    val errors: MutableList<Map<String, String?>> = ArrayList()
    val objectErrors = ex.bindingResult.allErrors
    objectErrors.forEach(Consumer { error: ObjectError ->
      val map: MutableMap<String, String?> = HashMap()
      val fieldName = (error as FieldError).field
      val errorMessage = error.getDefaultMessage()
      map[fieldName] = errorMessage
      errors.add(map)
    })
    res["message"] = "Invalid Fields"
    res["code"] = "400"
    res["errors"] = errors
    return res
  }

  @ExceptionHandler(InvalidFormatException::class)
  fun invalidFormatException(e: InvalidFormatException): CustomException {
    throw CustomException(
      httpStatus = HttpStatus.BAD_REQUEST,
      errorMessage = "Invalid Format",
      errors = listOf(e.toString(), "Invalid Format")
    )
  }

//  @ExceptionHandler(HttpMessageNotReadableException::class)
//  fun HttpMessageNotReadableException(e: HttpMessageNotReadableException): ResponseEntity<CustomExceptionTemplate> {
//    logger.error("HttpMessageNotReadableException", e)
//    val exceptionTemplate = CustomExceptionTemplate(
//      "400",
//      "Invalid request body",
//      listOf(listOf(e.message))
//    )
//    return ResponseEntity(exceptionTemplate, HttpStatus.BAD_REQUEST)
//  }

  @ExceptionHandler(IllegalStateException::class)
  fun illegalStateException(e: IllegalStateException): CustomException {
    val exceptionTemplate = CustomException(
      httpStatus = HttpStatus.BAD_REQUEST,
      errorMessage = e.message ?: "IllegalStateException",
    )
    return exceptionTemplate
  }

  @ExceptionHandler(DataIntegrityViolationException::class)
  fun dataIntegrityViolationException(e: DataIntegrityViolationException): CustomException {
    throw CustomException(
      httpStatus = HttpStatus.BAD_REQUEST,
      errorMessage = e.message ?: "DataIntegrityViolationException",
    )
  }

  private fun error(exception: Exception, httpStatus: HttpStatus): CustomException {
    val message = Optional.ofNullable(exception.message).orElse(exception.javaClass.simpleName)
    throw CustomException(
      httpStatus,
      message,
    )
  }
}