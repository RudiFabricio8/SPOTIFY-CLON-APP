package com.music.application.usecases.artist

import com.music.domain.repository.ArtistRepository

class GetArtistUseCase(private val artistRepository: ArtistRepository) {
    suspend operator fun invoke(id: Long) = artistRepository.getById(id)
}
