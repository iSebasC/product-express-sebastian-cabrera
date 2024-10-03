const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const Product = require('../models/Product');

// Obtener todos los productos
router.get('/', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json({
            success: true,
            message: 'Lista de productos obtenida correctamente.',
            data: products
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Crear un nuevo producto con validaciones
router.post(
    '/',
    [
        check('name')
            .notEmpty().withMessage('El nombre del producto es obligatorio.')
            .isString().withMessage('El nombre debe ser una cadena de texto.')
            .custom(async (value) => {
                const product = await Product.findOne({ where: { name: value } });
                if (product) {
                    throw new Error('El nombre del producto ya existe, elige otro.');
                }
            }),
        check('description').optional().isString().withMessage('La descripción debe ser una cadena de texto.'),
        check('price')
            .notEmpty().withMessage('El precio del producto es obligatorio.')
            .isFloat({ min: 0.01 }).withMessage('El precio debe ser un número positivo mayor a 0.'),
        check('stock')
            .notEmpty().withMessage('La cantidad en stock es obligatoria.')
            .isInt({ min: 0 }).withMessage('La cantidad en stock no puede ser negativa.')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Errores de validación.',
                errors: errors.array()
            });
        }

        try {
            const product = await Product.create(req.body);
            res.status(201).json({
                success: true,
                message: 'Producto creado exitosamente.',
                product: product
            });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }
);

// Actualizar un producto con validaciones
router.patch(
    '/:id',
    [
        check('name')
            .notEmpty().withMessage('El nombre del producto es obligatorio.')
            .isString().withMessage('El nombre debe ser una cadena de texto.')
            .custom(async (value, { req }) => {
                const product = await Product.findOne({ where: { name: value, id: { $ne: req.params.id } } });
                if (product) {
                    throw new Error('El nombre del producto ya existe, elige otro.');
                }
            }),
        check('description').optional().isString().withMessage('La descripción debe ser una cadena de texto.'),
        check('price')
            .notEmpty().withMessage('El precio del producto es obligatorio.')
            .isFloat({ min: 0.01 }).withMessage('El precio debe ser un número positivo mayor a 0.'),
        check('stock')
            .notEmpty().withMessage('La cantidad en stock es obligatoria.')
            .isInt({ min: 0 }).withMessage('La cantidad en stock no puede ser negativa.')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Errores de validación.',
                errors: errors.array()
            });
        }

        try {
            const product = await Product.findByPk(req.params.id);
            if (!product) {
                return res.status(404).json({ success: false, message: 'Producto no encontrado.' });
            }

            await product.update(req.body);
            res.json({
                success: true,
                message: 'Producto actualizado exitosamente.',
                product: product
            });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }
);

// Eliminar un producto
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Producto no encontrado.' });
        }

        await product.destroy();
        res.json({ success: true, message: 'Producto eliminado exitosamente.' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
