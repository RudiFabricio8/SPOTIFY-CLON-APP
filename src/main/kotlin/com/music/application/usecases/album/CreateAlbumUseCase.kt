package com.music.application.usecases.album

import com.music.domain.model.Album
import com.music.domain.repository.AlbumRepository

class CreateAlbumUseCase(private val albumRepository: AlbumRepository) {
    suspend operator fun invoke(album: Album): Album = albumRepository.create(album)
}
