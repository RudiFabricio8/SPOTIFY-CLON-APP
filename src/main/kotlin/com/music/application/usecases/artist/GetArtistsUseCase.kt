package com.music.application.usecases.artist

import com.music.domain.repository.ArtistRepository

class GetArtistsUseCase(private val artistRepository: ArtistRepository) {
    suspend operator fun invoke() = artistRepository.getAll()
}
