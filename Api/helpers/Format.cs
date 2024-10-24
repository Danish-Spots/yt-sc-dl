public static class Format {
    public static Dictionary<string, (string extension, string mimeType)>  formatMapping = new Dictionary<string, (string extension, string mimeType)>
    {
        { "best", (".opus", "audio/opus") },
        { "flac", (".flac", "audio/flac") },
        { "m4a", (".m4a", "audio/m4a") },
        { "mp3", (".mp3", "audio/mpeg") },
        { "opus", (".opus", "audio/opus") },
        { "vorbis", (".ogg", "audio/ogg") },
        { "wav", (".wav", "audio/wav") },
    };

}

