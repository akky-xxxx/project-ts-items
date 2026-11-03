import { external } from "external"
import { readFile } from "node:fs/promises"

import { subpath } from "#subpath"
import { internal } from "@/internal"

import { parent } from "../parent.ts"
import { sibling } from "./sibling.ts"

import type { Config } from "./config.ts"

import styles from "./style.css"

export const all = [Config, styles, sibling, parent, internal, subpath, external, readFile]
