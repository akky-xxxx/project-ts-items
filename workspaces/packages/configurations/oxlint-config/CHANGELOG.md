# Changelog

## [0.2.0](https://github.com/akky-xxxx/project-ts-items/compare/oxlint-config-v0.1.0...oxlint-config-v0.2.0) (2026-11-23)


### ⚠ BREAKING CHANGES

* **oxlint-config:** interfaces outside declaration files are now reported by typescript/consistent-type-definitions. Run `oxlint --fix` to convert them to type aliases, and keep module augmentations in declaration files.

### Features

* **oxlint-config:** add vitestConfig ([fe365a4](https://github.com/akky-xxxx/project-ts-items/commit/fe365a4ca14be78bbf58cbb72d3f106c45b71730))
* **oxlint-config:** add vitestConfig ([ca2fdfc](https://github.com/akky-xxxx/project-ts-items/commit/ca2fdfce7e684e36820100f8fd79390bcd82407b))
* **oxlint-config:** allow up to 300 lines in stories files ([431081c](https://github.com/akky-xxxx/project-ts-items/commit/431081cf08587efb6e7b0cc079875be9cf3d39ee))
* **oxlint-config:** disable import/max-dependencies in baseConfig ([753ebc9](https://github.com/akky-xxxx/project-ts-items/commit/753ebc96df0fee6839bf775eeb9dc1226b34f73f))
* **oxlint-config:** disable react-perf rules and no-magic-numbers in test files ([b56f99a](https://github.com/akky-xxxx/project-ts-items/commit/b56f99ae577ce739872589901f40dda65d180134))
* **oxlint-config:** ignore type-level numbers in no-magic-numbers ([b4b7fa3](https://github.com/akky-xxxx/project-ts-items/commit/b4b7fa32ff6e4640bef8569060c59c9923c7c915))
* **oxlint-config:** off the partial react-perf rules ([00d4208](https://github.com/akky-xxxx/project-ts-items/commit/00d42085e87a6baa41d7034ee0b90f6d97054946))
* **oxlint-config:** prefer type aliases over interfaces ([7ae675f](https://github.com/akky-xxxx/project-ts-items/commit/7ae675f7de27cedf119cf13d78ce3dc8472643ac))
* **oxlint-config:** relax baseConfig and storybookConfig rules ([420d0f2](https://github.com/akky-xxxx/project-ts-items/commit/420d0f2188335b950593bb494c8275df330a8242))
* **oxlint-config:** update vitestConfig ([ff12dd1](https://github.com/akky-xxxx/project-ts-items/commit/ff12dd199ea71225b5b4a3694a1b7183181848c5))

## [0.1.0](https://github.com/akky-xxxx/project-ts-items/compare/oxlint-config-v0.0.1...oxlint-config-v0.1.0) (2026-11-09)


### ⚠ BREAKING CHANGES

* **oxlint-config:** reactConfig now requires the standard <Fragment> form instead of the shorthand <></>. Replace shorthand fragments with <Fragment> imported from "react".

### Features

* localize website with next-intl ([f1896cc](https://github.com/akky-xxxx/project-ts-items/commit/f1896cc533732a9cb127b3b01cd7e9645b7aab08))
* **oxlint-config:** define eslint/id-length rule ([0dc5a79](https://github.com/akky-xxxx/project-ts-items/commit/0dc5a798e868099ef3507becf9ad71add3a313ca))
* **oxlint-config:** define nextConfig ([1b8d661](https://github.com/akky-xxxx/project-ts-items/commit/1b8d6611b7501068993e29c96a5f6077b87ece63))
* **oxlint-config:** define react/jsx-fragments rule ([665beb7](https://github.com/akky-xxxx/project-ts-items/commit/665beb7d4885b22baa55d2717bb91696737e0dec))
* **oxlint-config:** define storybookConfig ([67f8ecd](https://github.com/akky-xxxx/project-ts-items/commit/67f8ecde27b7696fe7265abf0d16680202e5eb3e))
* **oxlint-config:** define typescript/restrict-template-expressions rule ([276885c](https://github.com/akky-xxxx/project-ts-items/commit/276885cf72055c8cc1030ad74a00753a8677b0dc))
* **oxlint-config:** support nested app router convention files in nextConfig ([74ae60e](https://github.com/akky-xxxx/project-ts-items/commit/74ae60ee5fc845401ace529eb518ca1c8203beed))

## [0.0.1](https://github.com/akky-xxxx/project-ts-items/compare/oxlint-config-v0.0.1-alpha.1...oxlint-config-v0.0.1) (2026-11-03)


### Miscellaneous Chores

* **packages:** release 0.0.1 ([a3fcb16](https://github.com/akky-xxxx/project-ts-items/commit/a3fcb16c39e0518b2bba89904ad950580e1a6f84))

## [0.0.1-alpha.1](https://github.com/akky-xxxx/project-ts-items/compare/oxlint-config-v0.0.1-alpha.0...oxlint-config-v0.0.1-alpha.1) (2026-11-03)


### Miscellaneous Chores

* **packages:** add homepage and bugs to package.json ([902e2ce](https://github.com/akky-xxxx/project-ts-items/commit/902e2ce4e1ea24d2c53d6866053daf3b4fcf5fbb))
