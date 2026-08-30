import * as LottieModule from 'lottie-react'

// lottie-react ships both an ESM build and a UMD "browser" build.
// Depending on which one a bundler resolves, the default export can
// come through either as the component function directly, or wrapped
// in a module-shaped object ({ default: fn, useLottie, ... }). This
// normalizes it so the rest of the app always gets the actual
// component, regardless of how it resolved.
const resolved = LottieModule.default ?? LottieModule
const Lottie = typeof resolved === 'function' ? resolved : resolved.default

export default Lottie
