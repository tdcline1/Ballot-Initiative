import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { axios } from '@/hooks/axios'

export const useClearFiles = () => {
    return useMutation({
        mutationFn: async () => {
            await axios.delete(`/clear`)
            toast.success('Files cleared successfully', { description: 'All files have been removed.' })
        },
        onError: (error: any) => {
            toast.error(`Error clearing files`, { description: error.message })
        },
    })
}