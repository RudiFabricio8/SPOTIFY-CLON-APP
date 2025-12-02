package com.music.application.usecases.artist

import com.music.domain.model.Artist
import com.music.domain.repository.ArtistRepository

class UpdateArtistUseCase(private val artistRepository: ArtistRepository) {
    suspend operator fun invoke(artist: Artist) = artistRepository.update(artist)
}
