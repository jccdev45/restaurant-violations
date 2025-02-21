/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as RestaurantsImport } from './routes/restaurants'
import { Route as IndexImport } from './routes/index'
import { Route as RestaurantsIndexImport } from './routes/restaurants.index'
import { Route as RestaurantsRestaurantIdImport } from './routes/restaurants.$restaurantId'

// Create/Update Routes

const RestaurantsRoute = RestaurantsImport.update({
  id: '/restaurants',
  path: '/restaurants',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const RestaurantsIndexRoute = RestaurantsIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => RestaurantsRoute,
} as any)

const RestaurantsRestaurantIdRoute = RestaurantsRestaurantIdImport.update({
  id: '/$restaurantId',
  path: '/$restaurantId',
  getParentRoute: () => RestaurantsRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/restaurants': {
      id: '/restaurants'
      path: '/restaurants'
      fullPath: '/restaurants'
      preLoaderRoute: typeof RestaurantsImport
      parentRoute: typeof rootRoute
    }
    '/restaurants/$restaurantId': {
      id: '/restaurants/$restaurantId'
      path: '/$restaurantId'
      fullPath: '/restaurants/$restaurantId'
      preLoaderRoute: typeof RestaurantsRestaurantIdImport
      parentRoute: typeof RestaurantsImport
    }
    '/restaurants/': {
      id: '/restaurants/'
      path: '/'
      fullPath: '/restaurants/'
      preLoaderRoute: typeof RestaurantsIndexImport
      parentRoute: typeof RestaurantsImport
    }
  }
}

// Create and export the route tree

interface RestaurantsRouteChildren {
  RestaurantsRestaurantIdRoute: typeof RestaurantsRestaurantIdRoute
  RestaurantsIndexRoute: typeof RestaurantsIndexRoute
}

const RestaurantsRouteChildren: RestaurantsRouteChildren = {
  RestaurantsRestaurantIdRoute: RestaurantsRestaurantIdRoute,
  RestaurantsIndexRoute: RestaurantsIndexRoute,
}

const RestaurantsRouteWithChildren = RestaurantsRoute._addFileChildren(
  RestaurantsRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/restaurants': typeof RestaurantsRouteWithChildren
  '/restaurants/$restaurantId': typeof RestaurantsRestaurantIdRoute
  '/restaurants/': typeof RestaurantsIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/restaurants/$restaurantId': typeof RestaurantsRestaurantIdRoute
  '/restaurants': typeof RestaurantsIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/restaurants': typeof RestaurantsRouteWithChildren
  '/restaurants/$restaurantId': typeof RestaurantsRestaurantIdRoute
  '/restaurants/': typeof RestaurantsIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/restaurants'
    | '/restaurants/$restaurantId'
    | '/restaurants/'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/restaurants/$restaurantId' | '/restaurants'
  id:
    | '__root__'
    | '/'
    | '/restaurants'
    | '/restaurants/$restaurantId'
    | '/restaurants/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  RestaurantsRoute: typeof RestaurantsRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  RestaurantsRoute: RestaurantsRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/restaurants"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/restaurants": {
      "filePath": "restaurants.tsx",
      "children": [
        "/restaurants/$restaurantId",
        "/restaurants/"
      ]
    },
    "/restaurants/$restaurantId": {
      "filePath": "restaurants.$restaurantId.tsx",
      "parent": "/restaurants"
    },
    "/restaurants/": {
      "filePath": "restaurants.index.tsx",
      "parent": "/restaurants"
    }
  }
}
ROUTE_MANIFEST_END */
