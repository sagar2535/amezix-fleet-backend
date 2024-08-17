exports.store = catchAsync(async (req, res, next) => {
  const _ts = req.headers._ts;
  if (!_ts) {
    return next(new AppError(`_ts is required to be sent`, 403));
  }
  const { user: _tsUser } = req.cookies[`${_ts.split(" ")[1]}`];

  const { payload } = req.body;

  // console.log("payload: ", payload);

  const vendorCodeDtl = await sequelize.query(
    `SELECT generate_vendor_code(:name)`,
    {
      replacements: {
        name: payload.name || "",
      },
      type: sequelize.QueryTypes.SELECT,
    }
  );

  if (!vendorCodeDtl) {
    return next(new AppError("Error creating vendor code: ", 500));
  }

  const vendor_code = vendorCodeDtl[0]["generate_vendor_code"];

  const t = await sequelize.transaction();

  try {
    // inserting in vendor_master
    const vendorPost = new Object();

    vendorPost["name"] = payload["name"] || null;
    vendorPost["pan_no"] = payload["pan_no"] || null;
    vendorPost["isd_no"] = payload["isd_no"] || null;
    vendorPost["isd_dt"] = payload["isd_dt"] || null;
    vendorPost["cst_num"] = payload["cst_num"] || null;
    vendorPost["company"] = payload["company"] || null;
    vendorPost["tds_code"] = payload["tds_code"] || null;
    vendorPost["division"] = payload["division"] || null;
    vendorPost["gst_rate"] = payload["gst_rate"] || null;
    vendorPost["reg_flag"] = payload["reg_flag"] || null;
    vendorPost["pay_term"] = payload["pay_term"] || null;
    vendorPost["ven_type"] = payload["ven_type"] || null;
    vendorPost["reg_smind"] = payload["reg_smind"] || null;
    vendorPost["tech_code"] = payload["tech_code"] || null;
    vendorPost["qa_status"] = payload["qa_status"] || null;
    vendorPost["comp_code"] = _tsUser["comp_code"] || null;
    vendorPost["msme_type"] = payload["msme_type"] || null;
    vendorPost["stax_type"] = 0;
    vendorPost["curr_code"] = payload["curr_code"] || null;
    vendorPost["unit_code"] = payload["unit_code"] || null;
    vendorPost["inter_unit"] = payload["inter_unit"] || null;
    vendorPost["party_type"] = payload["party_type"] || null;
    vendorPost["created_by"] = _tsUser["emp_id"];
    vendorPost["gst_reg_no"] = payload["gst_reg_no"] || null;
    vendorPost["gst_reg_dt"] = payload["gst_reg_dt"] || null;
    vendorPost["sup_rataing"] = payload["sup_rataing"] || null;
    vendorPost["vendor_code"] = vendor_code;
    vendorPost["vendor_flag"] = payload["vendor_flag"] || null;
    vendorPost["credit_days"] = payload["credit_days"] || null;
    vendorPost["approved_by"] = payload["approved_by"] || null;
    vendorPost["reg_smind_no"] = payload["reg_smind_no"] || null;
    vendorPost["referral_code"] = payload["referral_code"] || null;
    vendorPost["vendor_status"] = payload["vendor_status"] || null;
    vendorPost["cust_cons_type"] = payload["cust_const_type"] || null;
    vendorPost["asstdcncrn_name"] = payload["asstdcncrn_name"] || null;
    vendorPost["last_updated_by"] = _tsUser["emp_id"];
    vendorPost["registeration_date"] = payload["registeration_date"] || null;
    vendorPost["object_version_number"] = 0;

    const vendor_master_data = await Vendor.create(vendorPost, {
      raw: true,
      transaction: t,
    });

    if (!vendor_master_data) {
      return next(
        new AppError("Error occured while inserting Vendor master data", 500)
      );
    }

    // inserting in vendor_regd_address
    const vendorAddressPost = new Object();

    vendorAddressPost["fax"] = payload["fax"] || null;
    vendorAddressPost["city"] = payload["city"] || null;
    vendorAddressPost["telex"] = payload["telex"] || null;
    vendorAddressPost["state"] = payload["state"] || null;
    vendorAddressPost["phones"] = payload["phones"] || null;
    vendorAddressPost["website"] = payload["website"] || null;
    vendorAddressPost["country"] = payload["country"] || null;
    vendorAddressPost["address1"] = payload["address1"] || null;
    vendorAddressPost["address2"] = payload["address2"] || null;
    vendorAddressPost["address3"] = payload["address3"] || null;
    vendorAddressPost["pin_code"] = payload["pin_code"] || null;
    vendorAddressPost["week_off"] = payload["week_off"] || null;
    vendorAddressPost["city_code"] = payload["city_code"] || null;
    vendorAddressPost["state_code"] = payload["state_code"] || null;
    vendorAddressPost["created_by"] = _tsUser["emp_id"];
    vendorAddressPost["vendor_code"] = vendor_code;
    vendorAddressPost["contact_person"] = payload["contact_person"] || null;
    vendorAddressPost["state_gst_code"] = payload["state_gst_code"] || null;
    vendorAddressPost["last_updated_by"] = _tsUser["emp_id"];
    vendorAddressPost["vendor_address_type"] = "HO";
    vendorAddressPost["object_version_number"] = 0;

    const vendor_regd_address = await VendorRegdAddress.create(
      vendorAddressPost,
      {
        raw: true,
        transaction: t,
      }
    );

    if (!vendor_regd_address) {
      return next(
        new AppError(
          "Error occured while inserting vendor registration address data",
          500
        )
      );
    }

    // inserting in vendor_bank_detail
    const vendorBankPost = new Object();

    vendorBankPost["ven_cd"] = vendor_code;
    vendorBankPost["bank_name"] = payload["bank_name"] || null;
    vendorBankPost["bank_addr"] = payload["bank_addr"] || null;
    vendorBankPost["micr_code"] = payload["micr_code"] || null;
    vendorBankPost["bank_ac_no"] = payload["bank_ac_no"] || null;
    vendorBankPost["dat_of_opn"] = payload["dat_of_opn"] || null;
    vendorBankPost["contact_no"] = payload["contact_no"] || null;
    vendorBankPost["created_by"] = _tsUser["emp_id"];
    vendorBankPost["bank_branch"] = payload["bank_branch"] || null;
    vendorBankPost["branch_email"] = payload["branch_email"] || null;
    vendorBankPost["nature_of_ac"] = payload["nature_of_ac"] || null;
    vendorBankPost["ven_comp_type"] = payload["ven_comp_type"] || null;
    vendorBankPost["senc_cr_limit"] = payload["senc_cr_limit"] || null;
    vendorBankPost["date_establish"] = payload["date_establish"] || null;
    vendorBankPost["contact_person"] = payload["contact_person"] || null;
    vendorBankPost["bank_ifcs_code"] = payload["bank_ifcs_code"] || null;
    vendorBankPost["last_updated_by"] = _tsUser["emp_id"];
    vendorBankPost["object_version_number"] = 0;

    const vendor_bank_detail = await VendorBankDetail.create(vendorBankPost, {
      raw: true,
      transaction: t,
    });

    if (!vendor_bank_detail) {
      return next(
        new AppError(
          "Error occured while inserting vendor registration address data",
          500
        )
      );
    }

    // inserting in vend_unit table
    const vendunit = new Object();
    const vendunit_line_length = payload.hasOwnProperty("vendunit_line")
      ? payload["vendunit_line"]["unit_cd"].length
      : 0;
    if (vendunit_line_length > 0) {
      for (let i = 0; i < vendunit_line_length; i++) {
        vendunit["dist"] = payload["vendunit_line"]["dist"][i] || null;
        vendunit["gl_cd"] = payload["vendunit_line"]["gl_cd"][i] || null;
        vendunit["ven_cd"] = vendor_code;
        vendunit["party_tp"] = payload["vendunit_line"]["party_tp"][i] || null;
        vendunit["unit_code"] =
          payload["vendunit_line"]["unit_code"][i] || null;
        vendunit["created_by"] = _tsUser["emp_id"];
        vendunit["transit_period"] =
          payload["vendunit_line"]["transit_period"][i] || null;
        vendunit["last_updated_by"] = _tsUser["emp_id"];
        vendunit["object_version_number"] = 0;

        const vend_unit = await VendUnit.create(vendunit, {
          raw: true,
          transaction: t,
        });

        if (!vend_unit) {
          return next(new AppError("Error inserting Vendor Unit data", 500));
        }
      }
    }

    // inserting in vendor_item table
    const vendItem = new Object();
    const venditem_line_length = payload.hasOwnProperty("itemmapping_line")
      ? payload["itemmapping_line"]["item_code"].length
      : 0;

    if (venditem_line_length > 0) {
      for (let i = 0; i < venditem_line_length; i++) {
        vendItem["item_code"] =
          payload["itemmapping_line"]["item_code"][i] || null;
        vendItem["proc_cd"] = payload["itemmapping_line"]["proc_cd"][i] || null;
        vendItem["rate"] = payload["itemmapping_line"]["rate"][i] || null;
        vendItem["jw_po"] = "P";
        vendItem["created_by"] = _tsUser["emp_id"];
        vendItem["vendor_code"] = vendor_code;
        vendItem["last_updated_by"] = _tsUser["emp_id"];
        vendItem["object_version_number"] = 0;

        const vendor_item = await VendorItem.create(vendItem, {
          raw: true,
          transaction: t,
        });

        if (!vendor_item) {
          return next(new AppError("Error inserting Vendor Item data", 500));
        }
      }
    }

    // inserting in vendor_conttact table
    const vendContact = new Object();
    const contact_line_length = payload.hasOwnProperty("contact_line")
      ? payload["contact_line"]["cont_pers"].length
      : 0;

    if (contact_line_length > 0) {
      for (let i = 0; i < contact_line_length; i++) {
        vendContact["dept"] = payload["contact_line"]["dept"][i] || null;
        vendContact["email"] = payload["contact_line"]["email"][i] || null;
        vendContact["desig"] = payload["contact_line"]["desig"][i] || null;
        vendContact["phone"] = payload["contact_line"]["phone"][i] || null;
        vendContact["mobile"] = payload["contact_line"]["mobile"][i] || null;
        vendContact["address"] = payload["contact_line"]["address"][i] || null;
        vendContact["cont_pers"] =
          payload["contact_line"]["cont_pers"][i] || null;
        vendContact["created_by"] = _tsUser["emp_id"];
        vendContact["vendor_code"] = vendor_code;
        vendContact["last_updated_by"] = _tsUser["emp_id"];
        vendContact["object_version_number"] = 0;

        const vendor_conttact = await VendorContact.create(vendContact, {
          raw: true,
          transaction: t,
        });

        if (!vendor_conttact) {
          return next(new AppError("Error inserting Vendor Contact data", 500));
        }
      }
    }

    // inserting in vendor_supp_detail table
    const vendReference = new Object();
    const reference_line_length = payload.hasOwnProperty("reference_line")
      ? payload["reference_line"]["vc_item_name"].length
      : 0;

    if (reference_line_length > 0) {
      for (let i = 0; i < reference_line_length; i++) {
        vendReference["vc_fax"] =
          payload["reference_line"]["vc_fax"][i] || null;
        vendReference["vc_telex"] =
          payload["reference_line"]["vc_telex"][i] || null;
        vendReference["vc_phone"] =
          payload["reference_line"]["vc_phone"][i] || null;
        vendReference["created_by"] = _tsUser["emp_id"];
        vendReference["vendor_code"] = vendor_code;
        vendReference["vc_item_name"] =
          payload["reference_line"]["vc_item_name"][i] || null;
        vendReference["last_updated_by"] = _tsUser["emp_id"];
        vendReference["vc_name_address"] =
          payload["reference_line"]["vc_name_address"][i] || null;
        vendReference["object_version_number"] = 0;

        const vendor_supp_detail = await VendorReference.create(vendReference, {
          raw: true,
          transaction: t,
        });

        if (!vendor_supp_detail) {
          return next(new AppError("Error inserting Vendor Supply data", 500));
        }
      }
    }

    // inserting in doc_ref_dtl_attatch, vendor_certf table
    const vendCertificate = new Object();
    const docAttach = new Object();
    const certdetail_line_length = payload.hasOwnProperty("certdetail_line")
      ? payload["certdetail_line"]["certf_name"].length
      : 0;

    if (certdetail_line_length > 0) {
      for (let i = 0; i < certdetail_line_length; i++) {
        vendCertificate["remarks"] =
          payload["certdetail_line"]["remarks"][i] || null;
        vendCertificate["certf_name"] =
          payload["certdetail_line"]["certf_name"][i] || null;
        vendCertificate["valid_date"] =
          payload["certdetail_line"]["valid_date"][i] || null;
        vendCertificate["created_by"] = _tsUser["emp_id"];
        vendCertificate["vendor_code"] = vendor_code;
        vendCertificate["last_updated_by"] = _tsUser["emp_id"];
        vendCertificate["object_version_number"] = 1;

        const vendor_certf = await VendorCertificate.create(vendCertificate, {
          raw: true,
          transaction: t,
        });

        if (!vendor_certf) {
          return next(new AppError("Error inserting certificate data", 500));
        }

        docAttach["unit_cd"] = _tsUser["unitcode"];
        docAttach["remarks"] = vendor_certf["remarks"];
        docAttach["ref_doc_no"] = vendor_code;
        docAttach["doc_id_ref"] = vendor_certf["vendor_line_id"];
        docAttach["created_by"] = _tsUser["emp_id"];
        docAttach["ref_doc_type"] = "Party Registration";
        docAttach["last_updated_by"] = _tsUser["emp_id"];
        docAttach["object_version_number"] = 1;

        if (payload["certdetail_line"]["doc_file"][i].data !== null) {
          const base64Data =
            payload["certdetail_line"]["doc_file"][i].data.split(",")[1];
          const fileBuffer = Buffer.from(base64Data, "base64");
          const fileName_tobe_uploaded = `${Date.now()}_${
            payload["certdetail_line"]["doc_file"][i]["doc_file_name"]
          }`;
          const doc_content_type =
            payload["certdetail_line"]["doc_file"][i]["doc_file_name"].split(
              "."
            )[1];
          const doc_original_filename =
            payload["certdetail_line"]["doc_file"][i]["doc_file_name"];

          writeFile(
            path.join(
              process.cwd(),
              "assets/uploads/" + fileName_tobe_uploaded
            ),
            fileBuffer
          )
            .then(() => console.log("--file uploaded successfully--"))
            .catch((err) => {
              return next(new AppError("Error uploading file", 500));
            });

          docAttach["path"] = fileName_tobe_uploaded;
          docAttach["content_type"] = doc_content_type;
          docAttach["doc_file_name"] = fileName_tobe_uploaded;
          docAttach["original_file_name"] = doc_original_filename;
        } else {
          docAttach["original_file_name"] = null;
          docAttach["content_type"] = null;
          docAttach["doc_file_name"] = null;
        }

        const doc_attach_ref_dtl = await DocAttatch.create(docAttach, {
          raw: true,
          transaction: t,
        });

        if (!doc_attach_ref_dtl) {
          return next(new AppError("Error inserting doc attatch data", 500));
        }
      }
    }

    await t.commit();

    res.status(200).json({
      status: "success",
      message: `Data for vendor code ${vendor_code} inserted successfully`,
      data: {},
    });
  } catch (error) {
    await t.rollback();
    console.log("data insert error: ", error);
    return next(new AppError(error.message));
  }
});
