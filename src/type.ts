export interface ChinaTotal {
	suspect: number;
	nowSevere: number;
	showlocalinfeciton: number;
	local_acc_confirm: number;
	deadAdd: number;
	localConfirmAdd: number;
	highRiskAreaNum: number;
	heal: number;
	dead: number;
	noInfect: number;
	showLocalConfirm: number;
	noInfectH5: number;
	nowLocalWzz: number;
	mRiskTime: string;
	localWzzAdd: number;
	mtime: string;
	nowConfirm: number;
	confirm: number;
	importedCase: number;
	localConfirmH5: number;
	confirmAdd: number;
	mediumRiskAreaNum: number;
	localConfirm: number;
}

export interface ChinaAdd {
	localConfirmH5: number;
	confirm: number;
	heal: number;
	nowConfirm: number;
	nowSevere: number;
	importedCase: number;
	noInfectH5: number;
	dead: number;
	suspect: number;
	noInfect: number;
	localConfirm: number;
}

export interface ShowAddSwitch {
	heal: boolean;
	importedCase: boolean;
	noInfect: boolean;
	confirm: boolean;
	suspect: boolean;
	nowConfirm: boolean;
	nowSevere: boolean;
	localConfirm: boolean;
	localinfeciton: boolean;
	all: boolean;
	dead: boolean;
}

export interface Today {
	confirm: number;
	isUpdated: boolean;
}

export interface Total {
	highRiskAreaNum: number;
	continueDayZeroLocalConfirm: number;
	mtime: string;
	adcode: string;
	nowConfirm: number;
	showRate: boolean;
	wzz: number;
	mediumRiskAreaNum: number;
	heal: number;
	provinceLocalConfirm: number;
	continueDayZeroLocalConfirmAdd: number;
	confirm: number;
	dead: number;
	showHeal: boolean;
}

export interface Today {
	dead_add: number;
	confirm: number;
	confirmCuts: number;
	isUpdated: boolean;
	tip: string;
	wzz_add: number;
	local_confirm_add: number;
	abroad_confirm_add: number;
}

export interface Total {
	confirm: number;
	wzz: number;
	continueDayZeroConfirm: number;
	continueDayZeroLocalConfirmAdd: number;
	mediumRiskAreaNum: number;
	highRiskAreaNum: number;
	adcode: string;
	showRate: boolean;
	showHeal: boolean;
	continueDayZeroConfirmAdd: number;
	nowConfirm: number;
	dead: number;
	heal: number;
	provinceLocalConfirm: number;
	mtime: string;
}

export interface Today {
	confirm: number;
	confirmCuts: number;
	isUpdated: boolean;
	wzz_add: number;
	local_confirm_add: number;
}

export interface Total {
	highRiskAreaNum: number;
	adcode: string;
	wzz: number;
	continueDayZeroLocalConfirmAdd: number;
	continueDayZeroLocalConfirm: number;
	mtime: string;
	confirm: number;
	showRate: boolean;
	heal: number;
	mediumRiskAreaNum: number;
	dead: number;
	showHeal: boolean;
	provinceLocalConfirm: number;
	nowConfirm: number;
}

export interface Children {
	name: string;
	adcode: string;
	date: string;
	today: Today;
	total: Total;
}

export interface Children {
	name: string;
	adcode: string;
	date: string;
	today: Today;
	total: Total;
	children: Children[];
}

export interface AreaTree {
	today: Today;
	total: Total;
	children: Children[];
	name: string;
}

export interface Diseaseh5Shelf {
	lastUpdateTime: string;
	chinaTotal: ChinaTotal;
	chinaAdd: ChinaAdd;
	isShowAdd: boolean;
	showAddSwitch: ShowAddSwitch;
	areaTree: AreaTree[];
}

export interface StatisGradeCityDetail {
	confirm: number;
	dead: number;
	grade: string;
	sdate: string;
	syear: number;
	province: string;
	nowConfirm: number;
	confirmAdd: number;
	wzz_add: string;
	mtime: string;
	city: string;
	heal: number;
	date: string;
}

export interface Data {
	diseaseh5Shelf: Diseaseh5Shelf;
	statisGradeCityDetail: StatisGradeCityDetail[];
}

export interface RootObject {
	ret: number;
	info: string;
	data: Data;
}