export default function () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ 'a': 1 });
    }, 1000);
  });
}

//# sourceMappingURL=load2.js.map