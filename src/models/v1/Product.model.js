"use strict";

const Prices = require("../models/prices.model");
const { getDateNow } = require("../../utils/Helpers");

exports.list = async (req, res) => {
    try {
        const limit = Number(req.query.limit) || 10;
        const offset = Number(req.query.offset) || 0;

        const data = await Prices.list({ limit, offset });

        return res.status(200).json({
            success: true,
            message: "Prices list fetched successfully",
            data,
        });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        const { productId, amount, category } = req.body;

        const payload = {
            productId,
            amount,
            category,
            createdAt: getDateNow(),
            deletedAt: null,
        };

        const data = await Prices.create(payload);

        return res.status(201).json({
            success: true,
            message: "Price created successfully",
            data,
        });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
};

exports.findById = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await Prices.findById(id);
        if (!data)
            return res
                .status(404)
                .json({ success: false, message: "Price not found" });

        return res.status(200).json({
            success: true,
            message: "Price retrieved successfully",
            data,
        });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;

        const payload = {
            ...req.body,
            updatedAt: getDateNow(),
        };

        const data = await Prices.update(id, payload);

        return res.status(200).json({
            success: true,
            message: "Price updated successfully",
            data,
        });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
};

exports.remove = async (req, res) => {
    try {
        const { id } = req.params;

        await Prices.remove(id);

        return res.status(200).json({
            success: true,
            message: "Price deleted successfully (soft delete)",
        });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
};
