// HOF - Hight order function
// Permet d'eviter de toujours faire des try catch
export const catchErrors = fn => (req, res, next) => {
  return fn(req, res, next).catch(next)
}
