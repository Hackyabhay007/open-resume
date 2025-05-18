import { Form, FormSection } from "components/ResumeForm/Form";
import {
  BulletListTextarea,
  Input,
} from "components/ResumeForm/Form/InputGroup";
import { BulletListIconButton } from "components/ResumeForm/Form/IconButton";
import type { CreateHandleChangeArgsWithDescriptions } from "components/ResumeForm/types";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import { changePublications, selectPublications } from "lib/redux/resumeSlice";
import type { ResumePublication } from "lib/redux/types";
import {
  changeShowBulletPoints,
  selectShowBulletPoints,
} from "lib/redux/settingsSlice";

export const PublicationsForm = () => {
  const publications = useAppSelector(selectPublications);
  const dispatch = useAppDispatch();
  const showDelete = publications.length > 1;
  const form = "publications" as const;
  const showBulletPoints = useAppSelector(selectShowBulletPoints(form));

  const handlePublicationChange = (
    idx: number,
    field: keyof ResumePublication,
    value: string | string[]
  ) => {
    if (field === "descriptions") {
      dispatch(changePublications({ idx, field, value: value as string[] }));
    } else {
      dispatch(changePublications({ idx, field, value: value as string }));
    }
  };

  const handleShowBulletPoints = (value: boolean) => {
    dispatch(changeShowBulletPoints({ field: form, value }));
  };

  return (
    <Form form={form}>
      {publications.map((publication, idx) => (
        <FormSection
          key={idx}
          form={form}
          idx={idx}
          showDelete={showDelete}
          showMoveUp={idx !== 0}
          showMoveDown={idx !== publications.length - 1}
          deleteButtonTooltipText="Delete publication"
        >
          <div className="col-span-full grid grid-cols-6 gap-3">
            <Input
              label="Title"
              labelClassName="col-span-full"
              name="title"
              placeholder="Research Paper Title"
              value={publication.title}
              onChange={(name, value) => handlePublicationChange(idx, name, value)}
            />
            <Input
              label="Publisher"
              labelClassName="col-span-full"
              name="publisher"
              placeholder="Journal/Conference Name"
              value={publication.publisher}
              onChange={(name, value) => handlePublicationChange(idx, name, value)}
            />
            <Input
              label="Date"
              labelClassName="col-span-full"
              name="date"
              placeholder="Jan 2023"
              value={publication.date}
              onChange={(name, value) => handlePublicationChange(idx, name, value)}
            />
            <div className="relative col-span-full">
              <BulletListTextarea
                label="Description"
                labelClassName="col-span-full"
                name="descriptions"
                placeholder="Bullet points"
                value={publication.descriptions}
                onChange={(name, value) => handlePublicationChange(idx, name, value)}
                showBulletPoints={showBulletPoints}
              />
              <div className="absolute left-[7.7rem] top-[0.07rem]">
                <BulletListIconButton
                  showBulletPoints={showBulletPoints}
                  onClick={handleShowBulletPoints}
                />
              </div>
            </div>
          </div>
        </FormSection>
      ))}
    </Form>
  );
}; 