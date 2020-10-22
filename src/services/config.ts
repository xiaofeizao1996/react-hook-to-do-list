const BACKEND_URL = IS_PROXY ? '/api' : NOVA_ROOT

const showConstants = () => {
  // eslint-disable-next-line no-console
  console.table({
    is_proxy: IS_PROXY,
    backend_url: NOVA_ROOT,
  })
}

export default showConstants

export { BACKEND_URL }
