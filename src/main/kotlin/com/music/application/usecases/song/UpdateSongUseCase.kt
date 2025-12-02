package com.music.application.usecases.song

import com.music.domain.model.Song
import com.music.domain.repository.SongRepository

class UpdateSongUseCase(private val songRepository: SongRepository) {
    suspend operator fun invoke(song: Song) = songRepository.update(song)
}
