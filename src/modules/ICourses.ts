export interface Courses {
	id: number;
	course_title: string;
	course_nr: number;
	days: number;
	location: Location;
	image: string;
	dates: Date;
	bookable: boolean;
}
enum Location {
	Classroom,
	Remote,
	Both,
}
