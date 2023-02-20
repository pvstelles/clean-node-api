import paths from '@/main/docs/paths'
import schemas from '@/main/docs/schemas'
import components from '@/main/docs/components'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean Node API',
    description: 'Api de Boilerplate',
    version: '1.0.0'
  },
  license: {
    name: 'GPL-3.0-or-later',
    url: 'https://spdx.org/licenses/GPL-3.0-or-later.html'
  },
  servers: [
    { url: '/api' }
  ],
  tags: [{ name: 'Login' }, { name: 'Enquete' }],
  paths,
  schemas,
  components
}
