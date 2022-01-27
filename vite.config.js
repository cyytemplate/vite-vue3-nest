import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuePugPlugin from 'vue-pug-plugin'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import { join } from 'path'

const resolve = dir => join(__dirname, dir)
// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'DEV' ? '' : '/static/',
  server: {
    port: 3001,
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },
  resolve: {
    alias: {
      '@': resolve('src'),
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  plugins: [
    vue({
      template: {
        preprocessOptions: {
          plugins: [{
            preCodeGen: vuePugPlugin
          }]
        }
      }
    }),
    Components({
      resolvers: [AntDesignVueResolver({
        importStyle: false
      })]
    })
  ]
})
