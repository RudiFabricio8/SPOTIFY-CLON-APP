package com.music.application.usecases.album

import com.music.domain.model.Album
import com.music.domain.repository.AlbumRepository

class UpdateAlbumUseCase(private val albumRepository: AlbumRepository) {
    suspend operator fun invoke(album: Album) = albumRepository.update(album)
}
