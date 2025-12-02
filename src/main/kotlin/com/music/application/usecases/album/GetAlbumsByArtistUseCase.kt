package com.music.application.usecases.album

import com.music.domain.repository.AlbumRepository

class GetAlbumsByArtistUseCase(private val albumRepository: AlbumRepository) {
    suspend operator fun invoke(artistId: Long) = albumRepository.getByArtist(artistId)
}
