
setInterval(() => {
    try {
        const video = document.getElementsByTagName('ytd-playlist-video-renderer')[0];
        video.querySelector('#primary button[aria-label="Action menu"]').click();
                
        document.evaluate(
            '//span[contains(text(),"Remove from")]',
            document,
            null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
            null
        ).snapshotItem(0).click();
    } catch (e) {
        
    }
}, 300);