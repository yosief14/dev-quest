export interface JobFormInterface {
    edit?: boolean
    jobData?: {
        id: string,
        company: string,
        companySite: string,
        positionLink: string,
        positionTitle: string,
        postDate: Date,
        applicationDate: Date,
        location: string,
        description: string
    }

}