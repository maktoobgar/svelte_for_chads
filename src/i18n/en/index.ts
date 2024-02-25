import type { BaseTranslation } from '../i18n-types';

const en = {
	NewProjectsNewTeam: 'New Projects, New Team',

	Chad1: 'You Got This Boy',
	Chad2: "That's Racist!!!",
	Chad3: "Don't Fuck UP",

	Success: 'We did something here',
	Error: 'There is some problem here',
	Info: 'You need to know this',

	SuccessMsg: 'Success',
	ErrorMsg: 'Error',
	InfoMsg: 'Info',

	ShowPopup: 'Show Popup',

	Cancel: 'Cancel',
	Submit: 'Submit',
	Username: 'Username',
	Password: 'Password',
	LogIn: 'Log in',
	UsernameExample: 'Jackson',
	LoggedIn: '{username:string} Logged In',
	Card1Title: 'This is a title',
	Card1Author: 'By Author',
	Card1Description:
		'Incididunt elit ipsum nulla pariatur dolore. Magna reprehenderit in nulla enim ad labore irure cillum elit ipsum nulla pariatur dolore.',
	Card1ExOne: 'Published',
	Card1ExOneTime: '12st June, 2020',
	Card1ExTwo: 'Reading time',
	Card1ExTwoTime: '3 minute',

	Card2TitleOne: 'Developer',
	Card2TitleTwo: 'Name',
	Card2Description:
		'Esse fugiat ea eu velit dolore Lorem ullamco ex exercitation eu magna et do eiusmod. In qui mollit mollit exercitation quis fugiat commodo ullamco labore incididunt nulla eu officia. Dolore in culpa dolore ullamco veniam. Nostrud commodo eiusmod sint ipsum elit eiusmod. Qui adipisicing consectetur labore cupidatat quis aliquip veniam ut nostrud nulla commodo nisi. Est mollit laboris magna incididunt. Culpa cillum sit tempor consequat eu',

	ShopCardPriceOne: 'Price',
	ShopCardPriceTwo: '400,000',
	ShopCardItemName: 'Food Name',
	ShopCardItemOneTitle: 'Reserved',
	ShopCardItemOneText: '2 tables',
	ShopCardItemTwoTitle: 'Dessert',
	ShopCardItemTwoText: '4 foods',
	ShopCardItemThreeTitle: 'Drink',
	ShopCardItemThreeText: '4 sodas',
	ShopCardDescription: 'chicken barbecue',

	Table: {
		Add: 'add',
		Next: 'next',
		Previous: 'previous',
		Users: 'users',
		ViewAll: 'view all',
		Approved: 'approved',
		New: 'new',
		Description: 'you can find your best friends here.',
		Search: 'search',
		Page: 'page',
		Of: 'of',
		Columns: {
			Name: 'name',
			Username: 'username',
			Description: 'description',
			CreatedAt: 'created at',
			UpdatedAt: 'updated at',
			Status: 'status',
			About: 'about',
			Users: 'users',
			LicenseUse: 'license use'
		}
	},

	DropDown: {
		ViewProfile: 'Profile',
		Settings: 'Settings',
		Team: 'Team',
		InviteColleagues: 'Invite Colleagues',
		Help: 'Help',
		SignOut: 'Sign Out',
		Name: 'Ernest Khalimov',
		Description: '09109999999'
	},

	Notification: {
		Min: 'm ago',
		Hour: 'h ago',
		Notifications: 'Notifications',
		YourImage: 'Your Image',
		YourPost: 'Your Post',
		RepliedOn:
			'<span class="font-bold ltr:pr-1 rtl:pl-1" href="#">{someone:string}</span>replied on<span class="px-1">{what:string}</span>. {ago:string}',
		LikedOn:
			'<span class="font-bold ltr:pr-1 rtl:pl-1" href="#">{someone:string}</span>liked<span class="px-1">{what:string}</span>. {ago:string}',
		Followed:
			'<span class="font-bold ltr:pr-1 rtl:pl-1" href="#">{someone:string}</span> started following you . {ago:string}'
	},

	MultiSelect: {
		AddItem: 'add item',
		Label: 'Options',
		FirstItem: 'first item',
		SecondItem: 'second item',
		ThirdItem: 'third item',
		ForthItem: 'forth item',
		FifthItem: 'fifth item',
		SixthItem: 'sixth item',
		NoItems: 'No Content',
		Limit: 'You can choose maximum of {limit:number} items'
	}
} satisfies BaseTranslation;

export default en;
