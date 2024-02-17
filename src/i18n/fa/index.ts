import type { Translation } from '../i18n-types';

const fa = {
	NewProjectsNewTeam: 'پروژه های جدید، تیم جدید',

	Chad1: 'نگاییدم',
	Chad2: 'نساییدم',
	Chad3: 'نمالیدم',

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
		MyImage: 'تصویر من',
		Notifications: 'اعلانات',
		Post: 'عکس',
		RepliedOn:
			'<span class="font-bold ltr:pr-1 rtl:pl-1" href="#">{someone}</span>پاسخ داد به<span class="px-1">{what}</span>. {ago}',
		LikedOn:
			'<span class="font-bold ltr:pr-1 rtl:pl-1" href="#">{someone}</span>،<span class="px-1">{what}</span>شما را پسندید. {ago}'
	}
} satisfies Translation;

export default fa;
