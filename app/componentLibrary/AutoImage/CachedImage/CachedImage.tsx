import React from 'react';
import RNFS from 'react-native-fs';
import {
  Image,
  ActivityIndicator,
  StyleSheet,
  ImageProps,
} from 'react-native';

interface CacheImageProps extends ImageProps {
  url: string;
  id: string;
}

const CacheImage = (props: CacheImageProps) => {
  const {url, id, ...ImageProps} = props;

  const [localUri, setLocalUri] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    loadLocalUri();
  }, [url]);

  const loadLocalUri = async () => {
    const cacheDir = RNFS.CachesDirectoryPath;
    const destinationUri = `${cacheDir}/${id}.png`;
    try {
      const fileInfobefore = await RNFS.stat(destinationUri);
      if (
        fileInfobefore.isFile() &&
        fileInfobefore.size > 0 &&
        fileInfobefore.path
      ) {
        setLocalUri(fileInfobefore.path);
        setLoading(false);
        return;
      }
    } catch (error) {
      await RNFS.downloadFile({
        fromUrl: url,
        toFile: destinationUri,
      }).promise;
      const fileInfo = await RNFS.stat(destinationUri);
      setLocalUri(fileInfo.path);
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <ActivityIndicator style={styles.loader} size="small" color="#fff" />
      ) : (
        localUri && (
          <Image source={{uri: localUri}} {...ImageProps} resizeMode="cover" />
        )
      )}
    </>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CacheImage;
