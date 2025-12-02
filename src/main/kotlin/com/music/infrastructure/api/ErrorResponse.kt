package com.music.infrastructure.api

data class ErrorResponse(
    val message: String,
    val error: String
)

class ResourceNotFoundException(message: String) : Exception(message)
class BadRequestException(message: String) : Exception(message)
