package com.music.application.usecases.song

import com.music.domain.repository.SongRepository

class GetSongUseCase(private val songRepository: SongRepository) {
    suspend operator fun invoke(id: Long) = songRepository.getById(id)
}
