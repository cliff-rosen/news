export const getElapsedTime = (inputTime) => {
  const iSecs = new Date(inputTime);
  const nSecs = new Date();
  const mins = Math.floor((nSecs.getTime() - iSecs.getTime()) / 1000 / 60);

  if (mins < 60) return mins + " minute" + (mins !== 1 ? "s" : "");

  if (mins < 60 * 24)
    return (
      Math.floor(mins / 60) + " hour" + (Math.floor(mins / 60) !== 1 ? "s" : "")
    );

  return (
    Math.floor(mins / 60 / 24) +
    " day" +
    (Math.floor(mins / 60 / 24) !== 1 ? "s" : "")
  );
};
