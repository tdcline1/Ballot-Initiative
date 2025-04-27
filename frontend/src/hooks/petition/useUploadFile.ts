import { useMutation } from '@tanstack/react-query'
import { axios } from '@/hooks/axios'

interface UploadFileProps {
    file: File
    filetype: string
}

export const useUploadFile = () => {
    return useMutation({
        mutationFn: async ({ file, filetype }: UploadFileProps) => {
            const formData = new FormData()
            formData.append('file', file)
            const response = await axios.post(`/upload/${filetype}`, formData)
            return response.data
        }
    })
}