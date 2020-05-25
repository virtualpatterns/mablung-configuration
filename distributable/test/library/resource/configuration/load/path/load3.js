export default async function () {
  await new Promise(resolve => {
    setTimeout(() => {
      resolve({ 'b': 2 });
    }, 1000);
  });
}
//# sourceMappingURL=load3.js.map