import { Form, FormSection } from "components/ResumeForm/Form";
import {
  BulletListTextarea,
  Input,
} from "components/ResumeForm/Form/InputGroup";
import { BulletListIconButton } from "components/ResumeForm/Form/IconButton";
import type { CreateHandleChangeArgsWithDescriptions } from "components/ResumeForm/types";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import { changeCertifications, selectCertifications } from "lib/redux/resumeSlice";
import type { ResumeCertification } from "lib/redux/types";
import {
  changeShowBulletPoints,
  selectShowBulletPoints,
} from "lib/redux/settingsSlice";

export const CertificationsForm = () => {
  const certifications = useAppSelector(selectCertifications);
  const dispatch = useAppDispatch();
  const showDelete = certifications.length > 1;
  const form = "certifications" as const;
  const showBulletPoints = useAppSelector(selectShowBulletPoints(form));

  const handleCertificationChange = (
    idx: number,
    field: keyof ResumeCertification,
    value: string | string[]
  ) => {
    if (field === "descriptions") {
      dispatch(changeCertifications({ idx, field, value: value as string[] }));
    } else {
      dispatch(changeCertifications({ idx, field, value: value as string }));
    }
  };

  const handleShowBulletPoints = (value: boolean) => {
    dispatch(changeShowBulletPoints({ field: form, value }));
  };

  return (
    <Form form={form}>
      {certifications.map((certification, idx) => (
        <FormSection
          key={idx}
          form={form}
          idx={idx}
          showDelete={showDelete}
          showMoveUp={idx !== 0}
          showMoveDown={idx !== certifications.length - 1}
          deleteButtonTooltipText="Delete certification"
        >
          <div className="col-span-full grid grid-cols-6 gap-3">
            <Input
              label="Certification Name"
              labelClassName="col-span-full"
              name="name"
              placeholder="AWS Certified Solutions Architect"
              value={certification.name}
              onChange={(name, value) => handleCertificationChange(idx, name, value)}
            />
            <Input
              label="Issuing Organization"
              labelClassName="col-span-full"
              name="issuer"
              placeholder="Amazon Web Services"
              value={certification.issuer}
              onChange={(name, value) => handleCertificationChange(idx, name, value)}
            />
            <Input
              label="Date"
              labelClassName="col-span-full"
              name="date"
              placeholder="Jan 2023"
              value={certification.date}
              onChange={(name, value) => handleCertificationChange(idx, name, value)}
            />
            <div className="relative col-span-full">
              <BulletListTextarea
                label="Description"
                labelClassName="col-span-full"
                name="descriptions"
                placeholder="Bullet points"
                value={certification.descriptions}
                onChange={(name, value) => handleCertificationChange(idx, name, value)}
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