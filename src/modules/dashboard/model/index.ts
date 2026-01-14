export type CandidateSkillLevel = 'Advanced' | 'Intermediate' | 'Beginner' | string
export type CandidateSkill = {
  language: string
  level: CandidateSkillLevel
}
export type Candidate = {
  username: string
  joined_at: string
  skills: CandidateSkill[]
  score: number
}
export type GetCandidatesResponse = Candidate[]

export type rol = 'Frontend' | 'Backend' | 'Fullstack' | 'DBA' | 'BA'
export type GetRolesResponse = {
  roles: rol[]
}