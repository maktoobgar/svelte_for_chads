// This file was auto-generated by 'typesafe-i18n'. Any manual changes will be overwritten.
/* eslint-disable */
import type { BaseTranslation as BaseTranslationType, LocalizedString, RequiredParams } from 'typesafe-i18n'

export type BaseTranslation = BaseTranslationType
export type BaseLocale = 'en'

export type Locales =
	| 'en'
	| 'fa'

export type Translation = RootTranslation

export type Translations = RootTranslation

type RootTranslation = {
	/**
	 * N​e​w​ ​P​r​o​j​e​c​t​s​,​ ​N​e​w​ ​T​e​a​m
	 */
	NewProjectsNewTeam: string
	/**
	 * Y​o​u​ ​G​o​t​ ​T​h​i​s​ ​B​o​y
	 */
	Chad1: string
	/**
	 * T​h​a​t​'​s​ ​R​a​c​i​s​t​!​!​!
	 */
	Chad2: string
	/**
	 * D​o​n​'​t​ ​F​u​c​k​ ​U​P
	 */
	Chad3: string
	/**
	 * W​e​ ​d​i​d​ ​s​o​m​e​t​h​i​n​g​ ​h​e​r​e
	 */
	Success: string
	/**
	 * T​h​e​r​e​ ​i​s​ ​s​o​m​e​ ​p​r​o​b​l​e​m​ ​h​e​r​e
	 */
	Error: string
	/**
	 * Y​o​u​ ​n​e​e​d​ ​t​o​ ​k​n​o​w​ ​t​h​i​s
	 */
	Info: string
	/**
	 * S​u​c​c​e​s​s
	 */
	SuccessMsg: string
	/**
	 * E​r​r​o​r
	 */
	ErrorMsg: string
	/**
	 * I​n​f​o
	 */
	InfoMsg: string
	/**
	 * S​h​o​w​ ​P​o​p​u​p
	 */
	ShowPopup: string
	/**
	 * C​a​n​c​e​l
	 */
	Cancel: string
	/**
	 * S​u​b​m​i​t
	 */
	Submit: string
	/**
	 * U​s​e​r​n​a​m​e
	 */
	Username: string
	/**
	 * P​a​s​s​w​o​r​d
	 */
	Password: string
	/**
	 * L​o​g​ ​i​n
	 */
	LogIn: string
	/**
	 * J​a​c​k​s​o​n
	 */
	UsernameExample: string
	/**
	 * {​u​s​e​r​n​a​m​e​}​ ​L​o​g​g​e​d​ ​I​n
	 * @param {string} username
	 */
	LoggedIn: RequiredParams<'username'>
}

export type TranslationFunctions = {
	/**
	 * New Projects, New Team
	 */
	NewProjectsNewTeam: () => LocalizedString
	/**
	 * You Got This Boy
	 */
	Chad1: () => LocalizedString
	/**
	 * That's Racist!!!
	 */
	Chad2: () => LocalizedString
	/**
	 * Don't Fuck UP
	 */
	Chad3: () => LocalizedString
	/**
	 * We did something here
	 */
	Success: () => LocalizedString
	/**
	 * There is some problem here
	 */
	Error: () => LocalizedString
	/**
	 * You need to know this
	 */
	Info: () => LocalizedString
	/**
	 * Success
	 */
	SuccessMsg: () => LocalizedString
	/**
	 * Error
	 */
	ErrorMsg: () => LocalizedString
	/**
	 * Info
	 */
	InfoMsg: () => LocalizedString
	/**
	 * Show Popup
	 */
	ShowPopup: () => LocalizedString
	/**
	 * Cancel
	 */
	Cancel: () => LocalizedString
	/**
	 * Submit
	 */
	Submit: () => LocalizedString
	/**
	 * Username
	 */
	Username: () => LocalizedString
	/**
	 * Password
	 */
	Password: () => LocalizedString
	/**
	 * Log in
	 */
	LogIn: () => LocalizedString
	/**
	 * Jackson
	 */
	UsernameExample: () => LocalizedString
	/**
	 * {username} Logged In
	 */
	LoggedIn: (arg: { username: string }) => LocalizedString
}

export type Formatters = {}
