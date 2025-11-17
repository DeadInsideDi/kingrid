export type DateType = Date | string | null

const msToYear = 1000 * 60 * 60 * 24 * 365

export const getAge = (birthDate: DateType, deathDate?: DateType) => {
	birthDate = birthDate ? new Date(birthDate) : new Date()
	deathDate = deathDate ? new Date(deathDate) : new Date()
	const age = (deathDate.getTime() - birthDate.getTime()) / msToYear
	return Math.max(0, Math.floor(age))
}
