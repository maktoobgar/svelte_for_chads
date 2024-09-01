import type { Translation } from '../i18n-types';

const fa = {
	NewProjectsNewTeam: 'پروژه های جدید، تیم جدید',

	Chad1: 'راحت جمعش میکنی',
	Chad2: 'حواستو جمع کن',
	Chad3: 'گند نزنی!!',

	Success: 'کارت درسته',
	Error: 'ی مشکلی هست',
	Info: 'این خیلی مهمه',

	SuccessMsg: 'موفق',
	ErrorMsg: 'خطا',
	InfoMsg: 'اطلاعات',

	ShowPopup: 'نمایش پنجره بازشو',

	Cancel: 'انصراف',
	Submit: 'ارسال',
	Username: 'نام کاربری',
	Password: 'رمز عبور',
	LogIn: 'ورود',
	UsernameExample: 'محمد',
	LoggedIn: '{username} وارد شد',
	Card1Title: 'این سرتیتر است',
	Card1Author: 'نویسنده',
	Card1Description:
		'لورم ایپسوم متن ساختگی با از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون است. با استفاده از طراحان گرافیک است، چاپگرها و متون است',
	Card1ExOne: 'انتشارشده',
	Card1ExOneTime: 'یکشنبه ،۲۲ دی ۱۳۹۸',
	Card1ExTwo: 'زمان خواندن',
	Card1ExTwoTime: '۳ دقیقه',

	Card2TitleOne: 'توسعه دهنده',
	Card2TitleTwo: 'اسم',
	Card2Description:
		'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان .',

	ShopCardPriceOne: 'قیمت',
	ShopCardPriceTwo: '400,000',
	ShopCardItemName: 'غذا',
	ShopCardItemOneTitle: 'سروشده',
	ShopCardItemOneText: '۲ میز',
	ShopCardItemTwoTitle: 'دسر',
	ShopCardItemTwoText: '۴ غذا',
	ShopCardItemThreeTitle: 'نوشیدنی',
	ShopCardItemThreeText: '۴ نوشابه',
	ShopCardDescription: 'جوجه کباب',

	Tooltip: 'فقط سوالو جواب بده',

	RadioButton: {
		Question: 'تجربه خود پس از استفاده از این قالب را بیان کنید.',
		Demo: [
			{ Title: 'عالی', Description: 'از این تجربه لذت بردی' },
			{ Title: 'خوب', Description: 'خوب بود ولی ترجیح میدی راه خودتو بری' },
			{
				Title: 'اممم...',
				Description: 'بزار فقط اینطوری بگیم که صرفا از هر کاری که داری انجام میدی بیشتر لذت میبری'
			},
			{ Title: 'نه', Description: 'برو همون react اتو استفاده کن... برو نبینمت' }
		]
	},

	DropDown: {
		ViewProfile: 'پروفایل',
		Settings: 'تنظیمات',
		Team: 'تیم',
		InviteColleagues: 'دعوت',
		Help: 'کمک',
		SignOut: 'خروج',
		Name: 'آقای بدن',
		Description: '09109999999'
	},

	Notification: {
		Min: ' دقیقه پیش',
		Hour: ' ساعت پیش',
		YourImage: 'تصویر شما',
		YourPost: 'پست شما',
		Notifications: 'اعلانات',
		RepliedOn:
			'<span class="font-bold" href="#">{someone}</span> به<span class="px-1">{what}</span>پاسخ داد. {ago}',
		LikedOn:
			'<span class="font-bold" href="#">{someone}</span><span class="px-1">{what}</span>را پسندید. {ago}',
		Followed:
			'<span class="font-bold ltr:pr-1 rtl:pl-1" href="#">{someone}</span> شما را دنبال کرد . {ago}'
	},

	MultiSelect: {
		AddItem: 'اضافه کردن مورد',
		Label: 'گزینه ها',
		FirstItem: 'آیتم اول',
		SecondItem: 'آیتم دوم',
		ThirdItem: 'آیتم سوم',
		ForthItem: 'آیتم چهارم',
		FifthItem: 'آیتم پنجم',
		SixthItem: 'آیتم ششم'
	},

	Table: {
		Users: 'کاربران',
		Description: 'بهترین دوستان خودتان را در اینجا پیدا کنید.',
		ViewAll: 'همه',
		Approved: 'تایید شده',

		Columns: {
			Name: 'نام',
			Username: 'نام کاربری',
			Description: 'توضیحات',
			CreatedAt: 'تاریخ ایجاد',
			UpdatedAt: 'تاریخ به روزرسانی',
			Status: 'وضعیت',
			About: 'درباره',
			Users: 'کاربران',
			LicenseUse: 'مجوز استفاده'
		}
	},

	//! Errors Messages (Do Not Delete)

	Errors: {
		BadRequestBody: 'خطا در درخواست وجود دارد'
	},

	//! Components (Do Not Delete)

	Components: {
		Table: {
			Add: 'اضافه کردن',
			Next: 'بعدی',
			Previous: 'قبلی',
			New: 'جدید',
			Search: 'جست و جو',
			Page: 'صفحه',
			Of: 'از'
		},

		MultiSelect: {
			NoItems: 'بدون محتوا',
			Limit: 'شما می توانید حداکثر {limit} مورد را انتخاب کنید'
		},

		ImageEditor: {
			Submit: 'ارسال'
		}
	}
} satisfies Translation;

export default fa;
