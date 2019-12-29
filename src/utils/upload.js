
/**
 * base64 to file
 * @param dataurl   base64 content
 * @param filename  set up a meaningful suffix, or you can set mime type in options
 * @returns {File|*}
 */
const dataURLtoFile = function dataURLtoFile(dataurl, filename) {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });// if env support File, also can use this: return new File([u8arr], filename, { type: mime });
};




// client表示OSS client实例
export default function uploadBase64Img(client,base64Content,filename,successCallck,errorCallback) {
  const imgfile = dataURLtoFile(base64Content, filename);
  //key表示上传的object key ,imgFile表示dataURLtoFile处理后返回的图片
  client.multipartUpload(filename, imgfile,{
      mime:"image/jpg",
  }).then((res) => {
    successCallck&&successCallck(res);
  }).catch((err) => {
    errorCallback&&errorCallback(err);
  });
};
			