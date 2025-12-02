package com.music.application.usecases.song

import com.music.domain.repository.SongRepository

class GetSongsByAlbumUseCase(private val songRepository: SongRepository) {
    suspend operator fun invoke(albumId: Long) = songRepository.getByAlbum(albumId)
}
