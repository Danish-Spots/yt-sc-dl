public class YtDlpMetadataSc {
    public required string uploader {get;set;}
    public required string title {get;set;}
    public required Thumbnail[] thumbnails {get; set;}
    public required string thumbnail {get;set;}
}
public class YtDlpMetadataYt {
    public required string channel {get;set;}
    public required string title {get;set;}
    public required string thumbnail {get;set;}
}

public class Thumbnail {
    public required string url {get;set;}
}
