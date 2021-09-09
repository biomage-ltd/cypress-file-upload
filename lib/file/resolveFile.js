import getFileContent from './getFileContent';
import getFileMimeType from './getFileMimeType';
import getFileEncoding from './getFileEncoding';
import getFileBlobAsync from './getFileBlobAsync';

export default function resolveFile(fixture, window, simulatedFilePath = null) {
  const { filePath, encoding, mimeType, fileName, lastModified } = fixture;

  const fileMimeType = mimeType || getFileMimeType(filePath);
  const fileEncoding = encoding || getFileEncoding(filePath);
  const fileLastModified = lastModified || Date.now();

  return new Cypress.Promise(resolve =>
    getFileContent({
      filePath,
      fileContent: fixture.fileContent,
      fileEncoding,
    })
      .then(fileContent =>
        getFileBlobAsync({
          fileContent,
          fileName,
          mimeType: fileMimeType,
          encoding: fileEncoding,
          lastModified: fileLastModified,
          window,
          simulatedFilePath,
        }),
      )
      .then(resolve),
  );
}
