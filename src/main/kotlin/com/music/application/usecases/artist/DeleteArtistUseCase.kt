package com.music.application.usecases.artist

import com.music.domain.repository.ArtistRepository

class DeleteArtistUseCase(private val artistRepository: ArtistRepository) {
    suspend operator fun invoke(id: Long): Boolean = artistRepository.delete(id)
}
