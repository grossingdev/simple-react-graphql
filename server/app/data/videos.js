class Video {
  constructor(args) {
    if (args) {
      const keys = Object.keys(args);
      keys.map(key => (this[key] = args[key]));
    }
  }
}

const videos = [{
  title: 'test',
  description: '',
}].map((item, i) => {
  const video = new Video();
  video.id = `${i}`;
  video.title = item.title;
  video.description = item.description;
  return video;
});

export { Video, videos };
