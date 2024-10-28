import { Dialog, DialogContent } from '@/components/ui/dialog';
import MainHeading from '../typography/MainHeading';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Branch } from '@/interfaces/branch';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useAppDispatch } from '@/redux/redux-hooks';
import { setBranch } from '@/redux/features/branchSlice';
import _ from 'lodash';

interface ModalPros {
  openModal: boolean;
  closeModal: () => void;
  branches: Array<Branch>;
}

const SelectBranchModal: React.FC<ModalPros> = ({
  openModal,
  closeModal,
  branches,
}) => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const [selectedBranch, setSelectedBranch] = useState<string | undefined>();

  const submitBranchSelection = () => {
    if (_.isEmpty(selectedBranch)) {
      toast({
        title: 'Select Branch',
        variant: 'destructive',
        description: 'Please select a branch',
      });
    } else {
      const branch = branches.find((x) => x.id === selectedBranch);
      if (branch) {
        dispatch(setBranch(branch));
        closeModal();
      }
    }
  };

  const handleSelect = (value: string) => {
    setSelectedBranch(value);
  };

  return (
    <div className="bg-modals">
      <Dialog open={openModal} onOpenChange={closeModal}>
        <DialogContent className="custom-modal bg-white">
          <MainHeading title="Select Branch" />

          <Select onValueChange={handleSelect} defaultValue={selectedBranch}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a Branch" />
            </SelectTrigger>
            <SelectContent>
              {branches?.map((e, i) => (
                <SelectItem key={i} value={e.id}>
                  {e.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="mt-5 w-full">
            <button
              onClick={() => submitBranchSelection()}
              className="leading-noramal focus:shadow-outline mb-2 w-full rounded bg-primary px-4 py-2 text-[12px] font-bold text-white focus:outline-none"
              type="button"
            >
              Submit
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default SelectBranchModal;
