import { Modal } from '@/components/ui/Modal'
import { useApplicationModal } from '@/context/ApplicationModalContext'
import { ApplicationForm } from './ApplicationForm'

/** Єдина модалка заявки на застосунок — рендериться один раз у App. */
export function ApplicationModal() {
  const { isOpen, close } = useApplicationModal()

  return (
    <Modal open={isOpen} onClose={close} title="Заявка на навчання">
      <ApplicationForm />
    </Modal>
  )
}
