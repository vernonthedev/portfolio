export const getUnsplashUrl = (
  query: string,
  width: number = 800,
  height: number = 600
): string => {
  return `https://images.unsplash.com/photo-${query}?w=${width}&h=${height}&fit=crop&q=80`;
};

export const getPicsumUrl = (
  width: number = 800,
  height: number = 600,
  seed?: string | number
): string => {
  const seedParam = seed ? `/seed/${seed}` : '';
  return `https://picsum.photos${seedParam}/${width}/${height}?grayscale&blur=1`;
};

export const placeholderImages = {
  hero: getUnsplashUrl('1451187580459-43490279c0fa', 1920, 1080),
  profile: getPicsumUrl(400, 400, 'profile'),
  project: (index: number) => getPicsumUrl(800, 600, `project-${index}`),
  blog: (index: number) => getUnsplashUrl('1461749280684-6595f51e14a0', 1200, 630),
  tech: {
    code: getUnsplashUrl('1555066931-4365d14bab8c', 800, 600),
    laptop: getUnsplashUrl('1498050108023-c5249f4df085', 800, 600),
    workspace: getUnsplashUrl('1486312338219-ce68d2c6f44d', 800, 600),
  }
};

export const gradients = {
  purple: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  orange: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  blue: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  pink: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  tech: 'linear-gradient(135deg, #3d2fa9 0%, #ff7722 100%)',
};

